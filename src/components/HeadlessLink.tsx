import Link from "next/link";
import { ForwardedRef, forwardRef } from "react";

export interface HeadlessLinkProps {
  href: string;
  as?: string;
  children?: JSX.Element | string;
}

export const HeadlessLink = forwardRef(
  (props: HeadlessLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
    let { href, as, children, ...rest } = props;
    return (
      <Link href={href} as={as}>
        <a ref={ref} {...rest}>
          {children}
        </a>
      </Link>
    );
  }
);

HeadlessLink.displayName = "HeadlessLink";
