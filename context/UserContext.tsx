import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useMutation } from 'react-query';
import { postUser, getUserById } from '@/utils/users';
import { UserRole } from '@/app/types';

const userContext = createContext<string | null>(null);

export const useUsers = () => {
  return useContext(userContext);
};

type Props = {
  children: React.ReactNode;
};

const ContextProvider = ({ children }: Props) => {
  const { user } = useUser();
  const [usuario, setUsuario] = useState<string | null>(null);
  const [exist, setExist] = useState(false);

  const mutation = useMutation((data: any) => postUser(data), {
    onSuccess: () => {
      if (user?.sub) {
        setUsuario(user.sub);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (!user) return;
  
    const id = user.sub;
    const datos = {
      id: id,
      firstName: '',
      userRole: UserRole.CONTACT,
      lastName: '',
      email: user.email,
      photo: user.picture,
      updatedAt: new Date(),
    };
  
    if (!id || !user.email) return;
  
    getUserById(id)
      .then((data) => {
        if (!data) {
          mutation.mutate(datos);
        }
        setExist(!!data);
      })
      .catch((err) => {
        console.log(err);
        setExist(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <userContext.Provider value={usuario}>{children}</userContext.Provider>;
};

export default ContextProvider;