// The official examples call `toast("…")` from sonner. Kronos' Toast is built on Base UI,
// so this maps the sonner-style calls onto the Toast component's manager.
import { toast as manager } from "@/components/ui/toast";

type Options = { description?: string };
type Type = "success" | "info" | "warning" | "error" | "loading";

const show = (type?: Type) => (title: string, options: Options = {}) =>
  manager.add({ title, description: options.description, type });

export const toast = Object.assign(show(), {
  success: show("success"),
  info: show("info"),
  warning: show("warning"),
  error: show("error"),
  loading: show("loading"),
});
