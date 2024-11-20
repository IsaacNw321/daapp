import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserById } from '@/utils/users'; 
import { deletedReview } from '@/utils/reviews';
import PaymentStatus from '@/components/dashboard/dashboardUser/myPaymentStatus/PaymentStatus';
import styles from '@/styles/admin.module.css'
export default function UserDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [addPayment, setAddPayment] = useState(false)
  const [typePayment, setTypePayment] = useState('PMOVIL')
  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const userData = await getUserById(id as string);
          setUser(userData);
          console.log(user)
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };
      fetchUser();
    }
  }, [id]);

  if (!user) return <p>Loading...</p>;
  let pending = 0;
  if(user.userRole === "REPRESENTATIVE"){
    for(let i= 0; i<user.representative.Payment.length; i++){
      if(user.representative.Payment[i].confirm === false){
        pending++
      }
    }
  }
  if(user.userRole === "DANCER"){
    for(let i= 0; i<user.dancer.Payment.length; i++){
      if(user.dancer.Payment[i].confirm === false){
        pending++
      }
    }
  }
  const handleShowP = (e: any) => {
    setAddPayment(prevState => !prevState)
  }
  const handleType = (e: any) => {
  const type = e.target.value
  setTypePayment(type)
  }
  const handlePayment =(id: string) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const typePayment = formData.get('typePayment') as string;

  if (typePayment === "PMOVIL") {
    const numberRef = formData.get('numberRef') as string;
    const paymentData = { numberRef, typePayment, id };
    console.log(paymentData);
  } else if (typePayment === "CASH") {
    const paymentData = { cash: true, typePayment, id };
    console.log(paymentData);
  }
  }
  console.log(pending)
  return (
    
    <div className={styles.container}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>Detalles de usuario</h1>
        </header>
        <div className={styles.content}>
  <div className={styles.grid}>
    <p>
      {user.userRole === "REPRESENTATIVE" ? "Representante" :
      user.userRole === "DANCER" ? "Bailarin" : 
      user.userRole === "CONTACT" ? "Usuario sin rol" : ""}
    </p>
    {user.userRole === "DANCER" ? (
      <>
        <DetailItem label="Nombre" value={`${user.firstName} ${user.lastName}`} />
        <DetailItem label="Edad" value={user.dancer.age} />
        <DetailItem label="Telefono" value={user.dancer.phone} />
        <DetailItem label="Direccion" value={user.dancer.Adress} />
        <DetailItem label="CI" value={user.dancer.CI} />
        <DetailItem label="Alergias" value={user.dancer.allergies} />
        <DetailItem label= "Fecha de inscripcion" value={user.createdAt}/>
        {
          user.dancer.review?.content ? (
            <>
        <DetailItem label="Comentario" value={user.dancer.review.content} />
        <button onClick={() => deletedReview(user.dancer.review.id)} className={styles.deleteButton}>
          Borrar Comentario 
        </button>
            </>

          ) : <></>
        }
        {
          user.active ? (
            <>
            <PaymentStatus Payment={user.dancer.Payment.length} pending={pending} />
            <h3>Lista de Pagos</h3>
                 <ul>               
                  { 
                    user.dancer.Payment.map(payment => {
                      return(
                        <li key={payment.id}>
                          {payment.type === "PMOVIL" ? (
                            <strong> Pago Movil : {payment.numberRef}
                             {payment.confirm ? null : (<button className={styles.roleButton}>
                             confirmar Pago
                             </button>)}</strong>
                          ) : (<strong> Efectivo : {payment.cash}   {payment.confirm ? null : (<button className={styles.roleButton}>
                             confirmar Pago
                             </button>)}</strong>)}
                        </li>
                      )
                    })
                  }
                 </ul>
                 <button  className={styles.roleButton} onClick={handleShowP}>
                    Agregar Pago
                  </button>
                  {
                    addPayment 
                    ? (
                      <form onSubmit={handlePayment(user.dancer.id)}>
                        <select name='typePayment' onChange={handleType} >
                          <option value="PMOVIL">Pago movil</option>
                          <option value="CASH">Efectivo</option>
                        </select>
                        {typePayment === "PMOVIL" ? (
                          <>
                          <label htmlFor="numberRef">Numero de Referencia</label>
                          <input type="text" name='numberRef'  placeholder='Numero de referencia'/>
                          </>
                        ) : null}
                        <button type='submit' className={styles.roleButton}>
                          Enviar
                        </button>
                      </form>
                    ) : null
                  }
            </>
          ) : <></> 
        }
      </>
    ) : user.userRole === "REPRESENTATIVE" ? (
      <>
        <DetailItem label="Nombre" value={`${user.firstName} ${user.lastName}`} />   
        <DetailItem label="Telefono" value={user.representative.phone} />
        <DetailItem label="Direccion" value={user.representative.Adress} />
        {
          user.representative.review?.content ? (
            <>
        <DetailItem label="Comentario" value={user.representative.review.content} />
        <button onClick={() => deletedReview(user.representative.review.id)} className={styles.deleteButton}>
          Borrar Comentario 
        </button>
            </>

          ) : <></>
        }
        <DetailItem label= "Fecha de inscripcion" value={user.createdAt}/>
        <ul className={styles.dancersR}>
          {user.representative?.dancers.map(dancer => {
            const pendingD = dancer.Payment.filter(payment => !payment.confirm).length;
            return(
              <li key={dancer.id}>
                <DetailItem label="Nombre" value={`${dancer.firstName} ${dancer.lastName}`} />
                <DetailItem label="Edad" value={dancer.age} />
                <DetailItem label="CI" value={dancer.cI} />
                <DetailItem label="Alergias" value={dancer.allergies} />
                <DetailItem label= "Fecha de inscripcion" value={dancer.dateBirth}/>
                {
                user.active ? (
                  <>
                 <h3>Lista de Pagos</h3>
                 <ul className={styles.dancersR}>               
                  { 
                    dancer.Payment.map(payment => {
                      return(
                        <li key={payment.id}>
                          {payment.type === "PMOVIL" ? (
                            <strong> Pago Movil : {payment.numberRef}
                             {payment.confirm ? null : (<button className={styles.roleButton}>
                             confirmar Pago
                             </button>)}</strong>
                          ) : (<strong> Efectivo : {payment.cash}   {payment.confirm ? null : (<button className={styles.roleButton}>
                             confirmar Pago
                             </button>)}</strong>)}
                        </li>
                      )
                    })
                  }
                  <button className={styles.roleButton} onClick={handleShowP}>
                    Agregar Pago
                  </button>
                  {
                    addPayment 
                    ? (
                      <form onSubmit={handlePayment(dancer.id)}>
                        <select name='typePayment' onChange={handleType} >
                          <option value="PMOVIL">Pago movil</option>
                          <option value="CASH">Efectivo</option>
                        </select>
                        {typePayment === "PMOVIL" ? (
                          <>
                          <label htmlFor="numberRef">Numero de Referencia</label>
                          <input type="text" name='numberRef'  placeholder='Numero de referencia'/>
                          </>
                        ) : null}
                        <button type='submit' className={styles.roleButton}>
                          Enviar
                        </button>
                      </form>
                    ) : null
                  }
                  <PaymentStatus Payment={dancer.Payment.length} pending={pendingD} />
                 </ul>
                  </>
                ) : <></> 
                }
              </li>
            )
          })}
        </ul>
      </>
    ) : (
      <p>Rol sin asignar</p>
    )}
  </div>
</div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: any) {
  return (
    <div className={styles.detailItem}>
      <p className={styles.detailLabel}>{label}</p>
      <p className={styles.detailValue}>{value}</p>
    </div>
  );
}