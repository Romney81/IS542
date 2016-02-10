// Get all the scripture volumes.
var scriptures = Scriptures.volumes();

// Load in all the scripture content
function scriptureContent(divClass) {
  var html = '';
  scriptures.forEach(function(element, index, array) {
    html += '<h5 class="text-center">'+ element.fullName +'</h5>';
    html += '<ul class="inline-block books">';
    element.books.forEach(function(element, index, array){
      html += '<li><a class="btn btn-info book_button" href="" onclick="bookClick('+element.id+')">' + element.gridName + '</a></li>';
    });
    html += '</ul>';
  });

  // Load in HTML
  $(divClass).html(html);
  // Fade HTML in
  $(divClass).fadeIn();
}

//When a user clicks on a book
function bookClick(ID) {
  event.preventDefault();
  var html = '';
  scriptures.forEach(function(element, index, array) {
    element.books.forEach(function(element, index, array){
      if (element.id === ID) {
        html += '<h5 class="text-center">'+ element.fullName +'</h5>';
        html += '<ul class="inline-block books">';
        for(var i = 1; i <= element.numChapters; i++){
          html += '<li><a href="" onclick="chapterClick('+ i +', '+ element.id +')" class="btn btn-info">' + i + '</a></li>';
        }
        html += '</ul>';
        $('#left_col').html(html);
      }
    });
  });
}

//When a user clicks on a chapter
function chapterClick(chapter, book){
  event.preventDefault();
  var html = '';

  $.ajax({
    url: 'http://scriptures.byu.edu/mapscrip/mapgetscrip.php?book='+book+'&chap='+chapter+'&verses=',
    context: document.body,
    success:function(data) {
      console.log(data);
      html += data;
      $('.center_col_content').html(html);
    }
  });
}


//When the dom loads... run these.
$(function() {
  scriptureContent('#left_col');
});
