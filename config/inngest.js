import { Inngest } from "inngest";
import connectDB from './db'; 
import User from '@/modals/User';

// Create a client to send and receive events
export const inngest = new Inngest({ id: "ecommer" });

// Helper to ensure DB connection for all handlers
async function withDB(handler) {
  await connectDB();
  return handler();
}

export const syncUserCreation = inngest.createFunction(
  { id: 'sync-user-from-clerk', name: 'Sync User Creation from Clerk' },
  { event: 'clerk/user.created' },
  async ({ event }) => {
    return withDB(async () => {
      const { id, first_name, last_name, email_addresses, image_url } = event.data;
      const userData = {
        _id: id,
        email: email_addresses[0]?.email_address,
        name: `${first_name} ${last_name}`,
        imageUrl: image_url,
      };
      await User.create(userData);
    });
  }
);

// USER UPDATION
export const syncUpdation = inngest.createFunction(
  { id: 'update-user-from-clerk', name: 'Sync User Updates from Clerk' },
  { event: 'clerk/user.updated' },
  async ({ event }) => {
    return withDB(async () => {
      const { id, first_name, last_name, email_addresses, image_url } = event.data;
      const userData = {
        email: email_addresses[0]?.email_address,
        name: `${first_name} ${last_name}`,
        imageUrl: image_url,
      };
      await User.findByIdAndUpdate(id, userData, { new: true, upsert: true });
    });
  }
);

export const syncUserDeletion = inngest.createFunction(
  { id: 'delete-user-from-clerk', name: 'Sync User Deletion from Clerk' },
  { event: 'clerk/user.deleted' },
  async ({ event }) => {
    return withDB(async () => {
      const { id } = event.data;
      await User.findByIdAndDelete(id);
    });
  }
);
  