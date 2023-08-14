import { Store } from "@prisma/client";
import prismadb from "~/lib/prismadb";

export class StoreService {
  async addNewStore(userId: string, name: string) {
    try {
      if (!userId) {
        return new Response("Unauthorized", { status: 401 });
      }

      if (!name) {
        return new Response("Bad request", { status: 400 });
      }

      const store = await prismadb.store.create({
        data: {
          name,
          userId,
        },
      });

      return new Response(JSON.stringify(store), { status: 201 });
    } catch (error) {
      console.error("[repositories/store]", error);
      return new Response("Internal server error", { status: 500 });
    }
  }

  async getStoreByUserId(userId: string) {
    try {
      const store = await prismadb.store.findFirst({
        where: {
          userId,
        },
      });

      if (!store) {
        return new Response("Not found", { status: 404 });
      }

      return new Response(JSON.stringify(store), { status: 200 });
    } catch (error) {
      console.error("[repositories/store]", error);
      return new Response("Internal server error", { status: 500 });
    }
  }

  async getStore(userId: string, storeId: string) {
    try {
      if (!storeId) {
        return new Response("Bad request", { status: 400 });
      }

      const store = await prismadb.store.findUnique({
        where: {
          id: storeId,
          userId,
        },
      });

      if (!store) {
        return new Response("Not found", { status: 404 });
      }

      return new Response(JSON.stringify(store), { status: 200 });
    } catch (error) {
      console.error("[repositories/store]", error);
      return new Response("Internal server error", { status: 500 });
    }
  }
}
