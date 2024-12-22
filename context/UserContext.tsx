import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useMutation } from 'react-query';
import { postUser, getUserById } from '@/utils/users';
import { UserRole, User } from '@/app/types';

const UserContext = createContext<string | null>(null);

export const UseUsers = () => {
  return useContext(UserContext);
};

type Props = {
  children: React.ReactNode;
};

const ContextProvider = ({ children }: Props) => {
  const { user } = useUser();
  const [usuario, setUsuario] = useState<string | null>(null);
  const [exist, setExist] = useState(false);
  const [userR, setUserR] = useState<User | undefined>(undefined)
  const mutation = useMutation((data: any) => postUser(data), {
    onSuccess: () => {
      if (user?.sub) {
        setUsuario(user?.sub?.split('|')[1]);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (!user || !user.sub) return;

    const id = user?.sub?.split('|')[1];
    const datos = {
      id,
      firstName: '',
      userRole: UserRole.CONTACT,
      lastName: '',
      email: user.email,
      photo: user.picture,
      updatedAt: new Date(),
    };

    if (!user.email) return;

    getUserById(id)
      .then((data) => {
        if (!data) {
          mutation.mutate(datos);
        }
        setExist(!!data);
        setUsuario(id)
      })
      .catch((err) => {
        console.log(err);
        setExist(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <UserContext.Provider value={usuario}>{children}</UserContext.Provider>;
};

export default ContextProvider;