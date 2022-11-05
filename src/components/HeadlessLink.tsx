import Link from "next/link"
import { ForwardedRef, forwardRef } from "react"

export interface HeadlessLinkProps {
  href: string;
  children?: JSX.Element | string;
}

export const HeadlessLink = forwardRef((props: HeadlessLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
  let { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  )
});

HeadlessLink.displayName = "HeadlessLink";