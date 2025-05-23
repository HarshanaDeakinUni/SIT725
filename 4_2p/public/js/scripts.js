
const cardList = [
    {
        title: "Puppy 1",
        image: "images/puppies.png",
        link: "About this pup",
        description: "I love playing and having fun! Let's be friends!"
    },
    {
        title: "Puppy 2",
        image: "images/puppies.png",
        link: "About this pup",
        description: "I love playing and having fun! Let's be friends!"
    },
    {
        title: "Puppy 3",
        image: "images/puppies.png",
        link: "About this pup",
        description: "I love playing and having fun! Let's be friends!"
    }
]
const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")
}
// const submitForm = () => {
//     let formData = {};
//     formData.first_name = $('#first_name').val();
//     formData.last_name = $('#last_name').val();
//     formData.password = $('#password').val();
//     formData.email = $('#email').val();
//     console.log("Form Data Submitted: ", formData);
    
//     $('#modal1').modal('close');
    
//     alert("Form Data Submitted: ");
    
// }
const submitForm = async () => {
    let formData = {
      firstName: $('#first_name').val(),
      lastName: $('#last_name').val(),
      password: $('#password').val(),
      email: $('#email').val()
    };
  
    console.log("Form Data Submitted: ", formData);
  
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('✅ ' + result.message);
        $('#registerForm')[0].reset(); // Clear the form
        $('#modal1').modal('close');   // Close the modal
      } else {
        alert('⚠️ ' + result.message);
      }
    } catch (error) {
      console.error('❌ Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  
const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">' +
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.image + '">' +
            '</div><div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span><p><a href="#">' + item.link + '</a></p></div>' +
            '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + item.title + '<i class="material-icons right">close</i></span>' +
            '<p class="card-text">' + item.desciption + '</p>' +
            '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}
$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        submitForm();
    })
    addCards(cardList);
    $('.modal').modal();
    $('#clickMeButton').click(() => {
        $('#modal1').modal('open');
    });
});


