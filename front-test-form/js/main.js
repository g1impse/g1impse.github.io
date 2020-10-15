window.onload = function() {

   var validPhone = false; // флажок для проверки телефона
   var validPassword = false; // флажок для проверки пароля

   function checkValid() { // функция для разблокировки кнопки
      if (validPhone && validPassword) {
         $('.login-form__button').prop('disabled', false);
      } else {
         $('.login-form__button').prop('disabled', true);
      }
   }

   var options =  {   // параметры маски телефона
      onComplete: function() {
         $('.login-form__row').addClass('valid');
         $('#phone').addClass('valid');
      },
      onChange: function(cep){
         if (cep.length != 17) {
            $('.login-form__row').removeClass('valid');
            $('#phone').removeClass('valid');
            validPhone = false;
         } else {
            validPhone = true;
         }
      }
   };

   $('#phone').mask('8 (AAA) AAA-AA-AA', options); // маска телефона

   $('#phone').on('input', function() { // валидация телефона
      let value = $(this).val();
      let reg = /^[0-9 ()+-]+$/;
      if (!reg.test(value)) {
         $('.login-form__row').addClass('error');
         $('#phone').addClass('error');
         validPhone = false;
      } else {
         $('.login-form__row').removeClass('error');
         $('#phone').removeClass('error');
      }
      checkValid();   
   })

   $('#password').on('input', function() { // валидация пароля
      if ($(this).val().length < 5) {
         validPassword = false
         $('.login-form__input--password').removeClass('valid');
      } else { 
         validPassword = true
         $('.login-form__input--password').addClass('valid');
      }
      checkValid();   
   })

   $('#request-form').on('submit', function(e){ // отправка формы
      e.preventDefault();

      let data = $(this).serialize();

      $.ajax({
         url: '/server.php',
         type: 'POST',
         data: data, 
         success: function() {
            alert('Форма отправлена')
         },
         error: function() {
            alert('Ошибка')  
         }    
      }); 
  });

}