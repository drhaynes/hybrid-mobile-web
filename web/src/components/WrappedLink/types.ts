import { Link } from '@/types/types'
import { AnchorHTMLAttributes } from 'react'

export type LinkProps = { noStyle?: boolean } & Pick<
    AnchorHTMLAttributes<HTMLElement>,
    'aria-label' | 'children' | 'className' | 'href' | 'onClick' | 'tabIndex' | 'target' | 'rel' | 'referrerPolicy'
> &
    Partial<Link>