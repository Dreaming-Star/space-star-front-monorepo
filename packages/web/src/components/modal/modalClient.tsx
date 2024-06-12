'use client'

import { useRouter } from 'next/navigation'
import { type ElementRef, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from '@packages/ui'
import styles from './modal.module.css'
import { useModalStore } from '@/store/modalStore'

function ModalClient({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const router = useRouter()
  const dialogRef = useRef<ElementRef<'dialog'>>(null)
  const modalRoot = document.getElementById('modal-root') || document.body

  const { isModalOpen, closeModal } = useModalStore()

  useEffect(() => {
    if (isModalOpen && dialogRef.current?.open) {
      dialogRef.current?.showModal()
    } else if (!isModalOpen && dialogRef.current?.open) {
      dialogRef.current?.close()
    }
  }, [isModalOpen])

  function onDismiss() {
    closeModal()
  }

  return createPortal(
    <div className="absolute bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-[1000] inset-0 h-full">
      <dialog
        ref={dialogRef}
        className={`flex flex-col items-center justify-around fixed inset-0 
                  bg-[url('/images/BG.svg')] bg-cover bg-center bg-no-repeat 
                  overflow-hidden rounded-[10px]
                  ${className}`}
        onClose={onDismiss}
      >
        {children}
        <button
          type="button"
          aria-label="닫기"
          onClick={onDismiss}
          className={styles['close-button']}
        >
          <CloseIcon />
        </button>
      </dialog>
    </div>,
    modalRoot,
  )
}

export default ModalClient