'use server'
import { revalidateTag } from 'next/cache'


export async function handleRefresh() {
  revalidateTag('teamList')
}