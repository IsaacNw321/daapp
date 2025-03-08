import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useMutation } from 'react-query';
import { postUser, getUserById } from '@/utils/users';
import { UserRole } from '@/app/types';

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

  const mutation = useMutation((data: any) => postUser(data), {
    onSuccess: (data) => {
      if (data && data.id) {
        setUsuario(data.id);
      }
    },
    onError: (error) => {
      console.log("Error posting user:", error);
    },
  });

  useEffect(() => {
    if (!user || !user.sub) return;

    const id = user.sub.split('|')[1];
    const now = new Date();
    const createdAt = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const datos = {
      id,
      firstName: '',
      userRole: UserRole.CONTACT,
      lastName: '',
      email: user.email,
      photo: user.picture,
      createdAt,
    };

    if (!user.email) return;

    getUserById(id)
      .then((data) => {
        if (data === undefined) {
          mutation.mutate(datos);
        } else {
          setUsuario(data.id);
        }
        setExist(!!data);
      })
      .catch((err) => {
        console.log("Error fetching user:", err);
        setExist(false);
      });
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={usuario}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;