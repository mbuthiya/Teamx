// Firebase Setup

var config = {
    apiKey: "AIzaSyDqap8oXezIx1xZQw1SEVYahE3mnNskcww",
    authDomain: "teamx-47bae.firebaseapp.com",
    databaseURL: "https://teamx-47bae.firebaseio.com",
    projectId: "teamx-47bae",
    storageBucket: "",
    messagingSenderId: "899088729893"
};

firebase.initializeApp(config)

// Database reference
var database = firebase.database()


function validateNumber(phoneNumber){
    if (phoneNumber.length >= 10){
        phoneNumber = phoneNumber.slice(1,9)
    }
    return phoneNumber
}

const errorMessage = "Something went wrong,Please try again"
const successMessage = "Success! We will email you shortly"

// User Interface logic
$(document).ready(function(){

    // Form logic
    $("#join-beta").submit(function(e){
        e.preventDefault()

        var role = $('input[name=user-role]:checked')
        var email = $('#email-beta')
        var phoneNumber =$("#phone-beta")
        var countryCode =$("#code-beta")
        var formResponse = $(".form-response")
        var formResponseMessage = $(".form-response-message")

        phoneNumberString = validateNumber(phoneNumber.val())

       var emailList = database.ref("Emails").push()
        emailList.set({
            role: role.val(),
            email: email.val(),
            phoneNumber: "+"+countryCode.val() + phoneNumberString
        },function(error){
            if(error){
                formResponseMessage.text(errorMessage)
            }else{
                formResponseMessage.text(successMessage)
            }
            formResponse.show()

            setTimeout(function(){
                formResponse.hide()
            },5000)
        }
        )

        role.val("")
        email.val("")
        phoneNumber.val("")
        countryCode.val("233")
        
        
    })

})