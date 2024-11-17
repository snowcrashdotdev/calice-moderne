import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { requiresRefresh, refreshSession } from '@/app/lib/session'

export async function middleware(_request: NextRequest) {
    if ((await requiresRefresh())) {
        await refreshSession()
    }

    return NextResponse.next()
}