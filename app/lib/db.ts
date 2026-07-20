import { PrismaPg } from "@prisma/adapter-pg";

type PrismaLikeClient = {
  inquiry: {
    create: (args: unknown) => Promise<unknown>;
    findMany: (args: unknown) => Promise<unknown[]>;
    update: (args: unknown) => Promise<unknown>;
  };
  appointment: {
    create: (args: unknown) => Promise<unknown>;
    findMany: (args: unknown) => Promise<unknown[]>;
    update: (args: unknown) => Promise<unknown>;
  };
  newsletterSubscriber: {
    upsert: (args: unknown) => Promise<unknown>;
    findMany: (args: unknown) => Promise<unknown[]>;
  };
};

let prismaClientPromise: Promise<PrismaLikeClient> | null = null;

export function getPrismaClient() {
  if (!prismaClientPromise) {
    prismaClientPromise = (async () => {
      try {
        const connectionString = process.env.DATABASE_URL?.trim();
        if (!connectionString) {
          throw new Error("DATABASE_URL is required for durable lead storage.");
        }

        const prismaModule = (await import("@prisma/client")) as {
          PrismaClient?: new (...args: unknown[]) => PrismaLikeClient;
        };
        if (!prismaModule.PrismaClient) {
          throw new Error("Prisma Client is unavailable. Run npm run prisma:generate.");
        }

        const adapter = new PrismaPg({ connectionString });
        return new prismaModule.PrismaClient({
          adapter,
          log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
        });
      } catch (error) {
        prismaClientPromise = null;
        throw new Error("Unable to initialize durable lead storage.", { cause: error });
      }
    })();
  }

  return prismaClientPromise;
}
