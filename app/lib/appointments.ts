export const appointmentTypes = [
  { value: "CONSULTATION", label: "Jewellery consultation" },
  { value: "BRIDAL", label: "Bridal appointment" },
  { value: "CUSTOM_DESIGN", label: "Custom design discussion" },
  { value: "REPAIR", label: "Repair and restoration" },
  { value: "OTHER", label: "Other" },
] as const;

export const appointmentTimeSlots = [
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 01:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
  "04:00 PM - 05:00 PM",
  "05:00 PM - 06:00 PM",
  "06:00 PM - 07:00 PM",
] as const;
