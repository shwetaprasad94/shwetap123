function getFlickrPhotosByLocation() {

  const lat = document.getElementById('lat');
  const long = document.getElementById('long');
  const submit = document.getElementById('submit');

  function displayPhotos(response) {
    getTags(response);
    console.log(response);
    const html = [];
    if (!response.error) {
      response.paths.forEach((item, i) => {
        //Add div id with photo id
        html.push(`<div id = image${i} >`);
        html.push(`<img src="${item.image}">`);
        html.push('</div>');
      });
      $("#photos").empty();
      $("#photos").append(html.join(''));
    }
  }

  function handleErrorTags(error) {
    console.log(error);
  }

  function getTags(response) {
    if (!response.error) {
      response.paths.forEach((item, count) => {
        var params = {
          "visualFeatures": "Tags",
          "details": "",
          "language": "en",
        };

        $.ajax({
          url: "https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze?" + $.param(params),
          beforeSend: function(xhrObj){
              xhrObj.setRequestHeader("Content-Type","application/json");
              xhrObj.setRequestHeader(
                  "Ocp-Apim-Subscription-Key", "01ac18df3fef45f581312cad8933f020");
          },
          type: "POST",
          data: '{"url": ' + '"' + item.image + '"}',
        }).done(function(data) {
          const imageDiv = document.getElementById('image' + count);
          imageDiv.style.position="relative";
          imageDiv.style.margin = "500px";
          data.tags.forEach((tag, i) => {
            //tags sorted by confidence.
            if (i<3) {
              //push top 3 tags to div
              var node = document.createElement('p');
              var textnode = document.createTextNode("#"+tag.name);
              node.appendChild(textnode);
              imageDiv.appendChild(node);
            }
          });
        }).fail(function(jqXHR, textStatus, errorThrown) {
          // Display error message.
          var errorString = (errorThrown === "") ? "Error. " :
              errorThrown + " (" + jqXHR.status + "): ";
          errorString += (jqXHR.responseText === "") ? "" :
              jQuery.parseJSON(jqXHR.responseText).message;
              console.log(errorString);
        });
      });
    }
  }

  function getPhotos() {
    $.ajax({
      url: '/api/student/flickr',
      data: {
        latitude: lat.value,
        longitude: long.value,
      },
      success: displayPhotos,
    });
  }

  function bindListeners() {
    submit.addEventListener('click', getPhotos);
  }

  bindListeners();
  getPhotos();
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getFlickrPhotosByLocation
  };
}
