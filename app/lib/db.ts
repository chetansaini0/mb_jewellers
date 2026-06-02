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

let prismaClientPromise: Promise<PrismaLikeClient | null> | null = null;

export function getPrismaClient() {
  if (!prismaClientPromise) {
    prismaClientPromise = (async () => {
      try {
        const prismaModule = (await import("@prisma/client")) as { PrismaClient?: new (...args: unknown[]) => PrismaLikeClient };
        if (!prismaModule.PrismaClient) return null;

        return new prismaModule.PrismaClient({
          log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
        });
      } catch {
        return null;
      }
    })();
  }

  return prismaClientPromise;
}
