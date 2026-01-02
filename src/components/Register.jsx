import { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Card, CardBody, CardHeader, FormFeedback, CardFooter} from 'reactstrap';
import axios from 'axios';

const initialValues = {
  ad: '',
  soyad: '',
  email: '',
  password: ''
}

export const errorsMessages = {
  ad: 'Adınız minimum 3 karakter olmalıdır',
  soyad: 'Soyadınız minimum 2 karakter olmalıdır',
  email: 'Geçerli bir email adresi giriniz',
  password: 'En az 8 karakter, en az 1 büyük, küçük harf, sembol ve rakamdan oluşan bir şifre giriniz'
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export default function Register() {

  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({        //Hata mesajlarını tutmak için bir state oluşturuyoruz.
    ad: false,
    soyad: false,
    email: false,
    password: false
  });

  const [isValid, setIsValid] = useState(false); 
  const [id, setId] = useState(""); 
  //Formun geçerliliğini tutmak için bir state oluşturuyoruz.
  //Butonun aktif/pasif olmasını bu state ile kontrol edeceğiz.

  useEffect(() => { 
    //formData veya errors değiştiğinde çalışacak.
    //isValid state'ini güncelleyeceğiz.(butonun aktif/pasif olmasını kontrol etmek için)
    if(
      formData.ad.trim().length >= 3 &&
      formData.soyad.trim().length >= 3 &&
      emailRegex.test(formData.email) &&
      passwordRegex.test(formData.password) //kontrol ediyoruz. ve koşullar sağlanıyorsa;
    ){  
      setIsValid(true); //Buton aktif olacak.
    }else{
      setIsValid(false); //Buton pasif olacak.
    } 
  }, [formData]) //depencies array'ine formData'yı ekliyoruz.
  
  const handleChange = (event) => {
    const {name, value} = event.target; //event.target'dan name ve value'yu destrüktüre ediyoruz.
    setFormData({...formData, [name]: value}); //formData'yı güncelliyoruz(değiştiriyoruz). Name alanını value ile güncelliyoruz.
    if(name=== 'ad' || name === 'soyad'){
      if(value.trim().length >= 3){ //trim(): baştaki ve sondaki boşlukları siler.
        setErrors({...errors, [name]: false}); //false: hata yok demek.
      }
      else{
        setErrors({...errors, [name]: true}); //true: hata var demek.
      }
        //name ad, soyad'ı temsil ediyor. Bu yüzden herbir alan için ayrı ayrı if yazmamıza gerek yok.
        //Tek bir if ile tüm alanları kontrol edebiliyoruz. || ile kontrol ediyoruz.
    }

    if(name === 'email'){
      if(emailRegex.test(value)){
        setErrors({...errors, [name]: false});
      }
      else{
        setErrors({...errors, [name]: true});
      }
    }

    if(name === 'password'){
      if(passwordRegex.test(value)){
        setErrors({...errors, [name]: false});
      }
      else{
        setErrors({...errors, [name]: true});
      }
    }
  }

/*  const handleSubmit = (event) => {
    event.preventDefault(); //Formun varsayılan submit davranışını engelliyoruz. / Sayfanın baştan yüklenmesini engelliyoruz.
    
    if(!isValid) return; //Eğer form geçerliyse (isValid true ise) return ile fonksiyondan çıkıyoruz.
    
    axios
      .post("https://reqres.in/api/users", formData) //formData'yı API'ye gönderiyoruz.
      .then(response => {
        setFormData(initialValues); //Formu temizliyoruz. Ne zaman? : Kayıt başarılı olursa formu temizle.
        setId(response.data.id); //API'den dönen id'yi state'e kaydediyoruz.
      })
      .catch(error => { 
        console.warn (error); 
      });
  };
*/
const handleSubmit = (event) => {
  event.preventDefault();

  if (!isValid) return;

  axios
    .post("https://jsonplaceholder.typicode.com/users", formData)
    .then(response => {
      console.log("API cevabı:", response.data); // burada kontrol et
      setFormData(initialValues);
      setId(response.data.id || "ID dönmedi"); // fallback ekle
    })
    .catch(error => {
      console.warn(error);
    });
};

  return (
    <div className="container mt-5">

      <Card>
        <CardHeader><h2 className="text-center mb-4">Kayıt Formu</h2></CardHeader>
        <CardBody>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="ad">Ad</Label>
              <Input
                id="ad"
                name="ad"
                placeholder="Adınızı giriniz"
                type="text"
                onChange={handleChange}
                value={formData.ad} //value'nın iki görevinden biri: input içeriğini temizlemek için (kayıt olduktan sonra).
                invalid={errors.ad} //Hata varsa input kırmızı olacak.
                data-cy="ad-input" //cypress bize ne öğütlüyor: git bu alanlara  kendin ID ver. 
              />
              {errors.ad && <FormFeedback data-cy="error-message"> {errorsMessages.ad} </FormFeedback>}
            </FormGroup>

            <FormGroup>
              <Label for="soyad">Soyad</Label>
              <Input
                id="soyad"
                name="soyad"
                placeholder="Soyadınızı giriniz"
                type="text"
                onChange={handleChange}
                value={formData.soyad}
                invalid={errors.soyad} //Hata varsa input kırmızı olacak.
                data-cy="soyad-input" //cypress bize ne öğütlüyor: git bu alanlara  kendin ID ver.
              />
              {errors.soyad && <FormFeedback data-cy="error-message"> {errorsMessages.soyad} </FormFeedback>}

            </FormGroup> 

            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Kurumsal email adresinizi giriniz"
                type="email"
                onChange={handleChange}
                value={formData.email}
                invalid={errors.email} //Hata varsa input kırmızı olacak.
                data-cy="email-input" //cypress bize ne öğütlüyor: git bu alanlara  kendin ID ver.
              />
              {errors.email && <FormFeedback data-cy="error-message"> {errorsMessages.email} </FormFeedback>}

            </FormGroup>

            <FormGroup>
              <Label for="password">Şifre</Label>
              <Input
                id="password"
                name="password"
                placeholder="Güçlü bir şifre oluşturunuz"
                type="password"
                onChange={handleChange}
                value={formData.password}
                invalid={errors.password} //Hata varsa input kırmızı olacak.
                data-cy="password-input" //cypress bize ne öğütlüyor: git bu alanlara  kendin ID ver.
              />
              {errors.password && <FormFeedback data-cy="error-message"> {errorsMessages.password} </FormFeedback>}
            </FormGroup>

            <Button type='submit' color="primary" className="w-100" disabled={!isValid} data-cy="submit-button">
              {/* Disabled'ı isValid'in tersi olarak ayarlıyoruz.*/}
              Kayıt Ol
            </Button>
          </Form>
        </CardBody>
        {id && <CardFooter data-cy="response-message"> ID : {id} </CardFooter>}
      </Card>
    </div>
  );
  }