import { errorsMessages } from "../../src/components/Register"

describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/') //Git bu sayfayı aç.
  })
  describe('Error Message', () => { //iç içe describe blokları yazılabilir.
    it('name input throws error for 2 characters', () => {
      //Arrange
//        cy.visit('http://localhost:5173/') //Git bu sayfayı aç.
      //Act
        cy.get('[data-cy="ad-input"]').type('em') // Name alanını yakaladık ([] ile yakaladık). Bir şeyler yazacağız.
      //Assert
        cy.contains(errorsMessages.ad) //Hata mesajını içeriyor mu?  
    })
      it('Surname input throws error for 2 characters', () => {
      //Arrange
//        cy.visit('http://localhost:5173/') //Git bu sayfayı aç.
      //Act
        cy.get('[data-cy="soyad-input"]').type('şa') // Surname alanını yakaladık ([] ile yakaladık). Bir şeyler yazacağız.
      //Assert
        cy.contains(errorsMessages.soyad) //Hata mesajını içeriyor mu?  
    })
      it('Email input throws error for emre@wit.', () => {
      //Arrange
//        cy.visit('http://localhost:5173/') //Git bu sayfayı aç.
      //Act
        cy.get('[data-cy="email-input"]').type('emre@wit.') // Email alanını yakaladık ([] ile yakaladık). Bir şeyler yazacağız.
      //Assert
        cy.contains(errorsMessages.email) //Hata mesajını içeriyor mu?  
    })
      it('Password input throws error for 1234', () => {
      //Arrange
//        cy.visit('http://localhost:5173/') //Git bu sayfayı aç.
      //Act
        cy.get('[data-cy="password-input"]').type('1234') // Password alanını yakaladık ([] ile yakaladık). Bir şeyler yazacağız.
      //Assert
        cy.contains(errorsMessages.password) //Hata mesajını içeriyor mu?  
    })

  })
  describe('Successful Registration', () => {
        it('Button is disabled for unvalidated inputs', () => {
      //Arrange
//        cy.visit('http://localhost:5173/') //Git bu sayfayı aç.
      //Act
        cy.get('[data-cy="password-input"]').type('1234') // Name alanını yakaladık ([] ile yakaladık). Bir şeyler yazacağız.
      //Assert
        cy.get('[data-cy="submit-button"]').should('be.disabled') //Butonun disable olduğunu doğrula.   
    })


  })
  describe('Form inputs validate', () => {
        it('name input throws error for 2 characters', () => {   //it.only ile sadece bu testi çalıştırırız. .skip ile bu testi atlarız.
          //only'i birkaç testte kullanabiliriz.
      //Arrange
//        cy.visit('http://localhost:5173/') //Git bu sayfayı aç.
      //Act
        cy.get('[data-cy="ad-input"]').type('Emre')
        cy.get('[data-cy="soyad-input"]').type('Şahiner')
        cy.get('[data-cy="email-input"]').type('emre@wit.com.tr')
        cy.get('[data-cy="password-input"]').type('12345Aa!')
      //Assert
        cy.get('[data-cy="submit-button"]').should('not.be.disabled') //Butonun disable olmadığını doğrula.
    })
  })
   describe('Form inputs validate', () => {
        it('name input throws error for 2 characters', () => { 
      //Act
          cy.get('[data-cy="ad-input"]').type('Emre')
          cy.get('[data-cy="soyad-input"]').type('Şahiner')
          cy.get('[data-cy="email-input"]').type('emre@wit.com.tr')
          cy.get('[data-cy="password-input"]').type('12345Aa!')
          cy.get('[data-cy="submit-button"]').click(); 
      //Assert
          cy.get('[data-cy="response-message"]').should('be.visible') //Cevap mesajının göründüğünü doğrula.      
    })
})
})

//İstediğimiz decribe'ın içine ya da bütün describe bloklarının dışına beforeEach yazarsak her  testten önce çalışır.

//Örnek:
// beforeEach(() => {
//   cy.visit('http://localhost:5173/') //Git bu sayfayı aç.
// })
// describe('Register Page', () => {...}
