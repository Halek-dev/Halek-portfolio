// Hand-authored to match supabase/schema.sql. If you change the schema,
// change this too — or regenerate with:
//   npx supabase gen types typescript --project-id <id> > lib/supabase/types.ts

export const CONTACT_CHANNELS = ["email", "whatsapp", "imessage", "telegram", "sms"] as const;
export type ContactChannel = (typeof CONTACT_CHANNELS)[number];

/** Display labels and input hints for each channel. */
export const CHANNEL_META: Record<
  ContactChannel,
  { label: string; placeholder: string; type: string; inputMode: "text" | "email" | "tel" }
> = {
  email: { label: "Email", placeholder: "you@company.com", type: "email", inputMode: "email" },
  whatsapp: { label: "WhatsApp", placeholder: "+234 800 000 0000", type: "tel", inputMode: "tel" },
  imessage: { label: "iMessage", placeholder: "Apple ID or phone", type: "text", inputMode: "text" },
  telegram: { label: "Telegram", placeholder: "@username", type: "text", inputMode: "text" },
  sms: { label: "SMS", placeholder: "+234 800 000 0000", type: "tel", inputMode: "tel" },
};

export const LEAD_STATUSES = ["pending", "accepted", "rejected"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const PROJECT_STATUSES = ["onboarding", "in_progress", "review", "delivered"] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const MESSAGE_SENDERS = ["client", "halek"] as const;
export type MessageSender = (typeof MESSAGE_SENDERS)[number];

export type LeadContact = { channel: ContactChannel; value: string };

export type Lead = {
  id: string;
  name: string;
  business: string;
  project_description: string | null;
  contacts: LeadContact[];
  referrer: string | null;
  status: LeadStatus;
  created_at: string;
};

export type Project = {
  id: string;
  lead_id: string;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
};

export type Message = {
  id: string;
  project_id: string;
  sender: MessageSender;
  body: string;
  created_at: string;
};

// NOTE: supabase-js only accepts a schema that structurally matches its
// `GenericSchema` — Views, Functions, Enums, CompositeTypes and a
// per-table `Relationships` are all required. Omit any of them and the
// whole thing silently degrades to `never`, which shows up as
// "does not exist in type 'never[]'" on your first .insert().
export type Database = {
  public: {
    Tables: {
      leads: {
        Row: Lead;
        Insert: Omit<Lead, "id" | "status" | "created_at"> &
          Partial<Pick<Lead, "id" | "status" | "created_at">>;
        Update: Partial<Lead>;
        Relationships: [];
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, "id" | "status" | "created_at" | "updated_at"> &
          Partial<Pick<Project, "id" | "status" | "created_at" | "updated_at">>;
        Update: Partial<Project>;
        Relationships: [
          {
            foreignKeyName: "projects_lead_id_fkey";
            columns: ["lead_id"];
            referencedRelation: "leads";
            referencedColumns: ["id"];
            isOneToOne: true;
          },
        ];
      };
      messages: {
        Row: Message;
        Insert: Omit<Message, "id" | "created_at"> & Partial<Pick<Message, "id" | "created_at">>;
        Update: Partial<Message>;
        Relationships: [
          {
            foreignKeyName: "messages_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
            isOneToOne: false;
          },
        ];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: {
      lead_status: LeadStatus;
      project_status: ProjectStatus;
      message_sender: MessageSender;
    };
    CompositeTypes: Record<never, never>;
  };
};
