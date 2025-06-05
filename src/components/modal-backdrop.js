'use client';
import { useRouter } from 'next/navigation';

export default function ModalBackdrop({ children }) {
    const router = useRouter();

    const handleBackdropClick = () => {
        router.back();
    };

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <dialog open className="modal" onClick={handleModalClick}>
                {children}
            </dialog>
        </div>
    );
}