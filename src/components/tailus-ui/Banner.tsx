import React from "react";
import { cn } from "@/lib/utils";

interface BannerRootProps extends React.HTMLAttributes<HTMLDivElement> {
  intent?: "gray" | "info" | "success" | "warning" | "danger";
}

const Root = React.forwardRef<HTMLDivElement, BannerRootProps>(
  ({ className, intent = "gray", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="banner"
        aria-label={`${intent} banner`}
        className={cn(
          "grid grid-cols-[auto,1fr] gap-3 rounded-[--feedback-radius] border p-[--feedback-padding]",
          intent === "gray" && [
            "[--title-text-color:theme(colors.gray.800)] dark:[--title-text-color:theme(colors.white)]",
            "[--body-text-color:theme(colors.gray.600)] dark:[--body-text-color:theme(colors.gray.400)]",
            "dark:border-gray-500/15 border-gray-200 bg-gray-100 dark:bg-gray-500/10",
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Root.displayName = "Banner.Root";

const Content = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("text-sm text-[--body-text-color]", className)}
      {...props}
    >
      {children}
    </div>
  );
});
Content.displayName = "Banner.Content";

interface BannerProps {
  Root: typeof Root;
  Content: typeof Content;
}

const Banner = {
  Root,
  Content,
} as BannerProps;

export default Banner;
