import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'

interface ModalProps {
  children: React.ReactNode
  title: string
  description?: string
  isOpen: boolean
  onClose: () => void
  onSubmit?: () => void
  submitText?: string
  cancelText?: string
  showFooter?: boolean
  submitVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: string
  className?: string
}

const Modal: React.FC<ModalProps> = ({
  children,
  title,
  description,
  isOpen,
  onClose,
  onSubmit,
  submitText = 'Submit',
  cancelText = 'Cancel',
  showFooter = true,
  submitVariant = "default",
  size,
  className = ''
}) => {
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${size} ${className}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        
        <div className="py-4">
          {children}
        </div>

        {showFooter && (
          <DialogFooter>
            <Button
              variant="outline"
              onClick={onClose}
            >
              {cancelText}
            </Button>
            {onSubmit && (
              <Button
                className='bg-indigo-400 hover:bg-indigo-500 text-white'
                onClick={handleSubmit}
              >
                {submitText}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default Modal