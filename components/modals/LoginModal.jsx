'use client'

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useForm, FieldValues } from 'react-hook-form';
import { useCallback, useContext, useState } from 'react';
import Modal from './Modal';
import { BiHeading } from 'react-icons/bi';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import { UiContext } from '../../contexts/ui/UiProvider';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginModal = ({ }) => {

    const router = useRouter();

    const { LoginModalisOpen, onCloseLoginModal, onOpenLoginModal, onOpenRegisterModal } = useContext(UiContext);

    const toggleModal = useCallback(
        () => {
            onCloseLoginModal();
            onOpenRegisterModal();
        }
        , [onCloseLoginModal, onOpenRegisterModal]);


    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues:
        {
            email: 'ricardo@google.com',
            password: '88888888',
        }
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false,
        }).then(
            (res) => {
                setIsLoading(false);
                if (!res.error) {
                    toast.success('¡Bienvenido a Tattuo! 🎉');
                    router.refresh();
                    onCloseLoginModal();
                }

                if (res.error) {
                    toast.error(res.error);
                }
            }

        )

    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title="Bienvenido de nuevo"
                subtitle="Accede a tu cuenta"
            />

            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

        </div>)

    const footerContent = (

        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Accede con Google"
                icon={FcGoogle}
                onClick={() => { signIn('google') }} />

            <div className="
            text-neutral-500
            text-center
            mt-4
            font-light
            ">
                <div className='
                flex flex-row justify-center items-center gap-2'>
                    <div>¿No tienes una cuenta?</div>
                    <div
                        onClick={toggleModal}
                        className="
                    text-neutral-800
                    cursor-pointer
                    hover:underline
                    "
                    >¡Regístrate!</div>

                </div>


            </div>

        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={LoginModalisOpen}
            title="Login"
            actionLabel={isLoading ? 'Cargando...' : 'Acceder'}
            onClose={onCloseLoginModal}
            onOpen={onOpenLoginModal}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
};

export default LoginModal;