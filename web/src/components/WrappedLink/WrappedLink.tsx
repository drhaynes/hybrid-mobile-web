'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { LinkProps } from './types'
import { useAppInNativeMobileContext } from '@/hooks/useAppInNativeMobileContext';

export const WrappedLink = (props: LinkProps) => {
    const { className, newWindow, noFollow, onClick, tabIndex, noStyle, referrerPolicy } = props
    const href = props.url || props.href || ''
    const children = props.children || props.label
    const appIsInNativeMobileContext = useAppInNativeMobileContext()

    const anchorProps = {
        'aria-label': props['aria-label'],
        className: clsx(typeof children === 'string' && !noStyle, className),
        onClick,
        rel: clsx(newWindow && 'noopener noreferrer', noFollow && 'nofollow') || undefined,
        tabIndex,
        target: newWindow ? '_blank' : undefined,
        referrerPolicy: referrerPolicy ? referrerPolicy : undefined,
    }

    const spanProps = {
        'aria-label': props['aria-label'],
        className: clsx(typeof children === 'string' && !noStyle, className),
        tabIndex,
    }

    return !href ? (
        <span {...spanProps}>{children}</span>
    ) : appIsInNativeMobileContext ? (
        <a href={href}>
            {children}
        </a>
    ) : (
        <Link href={href} {...anchorProps}>
            {children}
        </Link>
    )
}

export default WrappedLink