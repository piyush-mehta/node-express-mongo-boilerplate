var update = document.getElementById('update');

update.addEventListener('click', function(){
    console.log('update button clicked');
    fetch('quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'firstname': 'pm',
          'quote': 'I find your lack of faith disturbing.'
        })
      });
      location.reload();

});