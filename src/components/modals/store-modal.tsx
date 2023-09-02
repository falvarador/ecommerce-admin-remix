import { toast } from "react-hot-toast";
import { useAuth } from "@clerk/remix";
import { useFetcher } from "@remix-run/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Modal,
} from "@/components/ui";
import { useStoreModal } from "@/hooks";

const schema = z.object({
  name: z.string().min(3).max(255),
});

export function StoreModal() {
  const { userId } = useAuth();
  const fetcher = useFetcher();

  const { isOpen, onClose } = useStoreModal();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const { name } = values;

      if (!userId) {
        throw new Error("User not found.");
      }

      fetcher.submit({ userId, name }, { method: "POST" });
      toast.success("Store created successfully.");
    } catch (error) {
      toast.error("Something went wrong, please try again later.");
    }
  };

  return (
    <>
      <Modal
        title="Create store"
        description="Add a new store to manage products and categories."
        isOpen={isOpen}
        onClose={onClose}
      >
        <div>
          <div className="space-y-4 py-2 pb-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={fetcher.state === "submitting"}
                          placeholder="E-Commerce"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end">
                  <Button
                    disabled={fetcher.state === "submitting"}
                    variant="outline"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={fetcher.state === "submitting"}
                    type="submit"
                  >
                    Continue
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
}
