$("#search").on("click", function(){
  $("#mainbody").empty()
  var query=  "https://cors-anywhere.herokuapp.com/https://remotive.io/api/remote-jobs?category=software-dev"
  $.ajax({
   url: query,
   method:"GET"
  }) .then(function(remotive){
      
      for(var i=0; i < 8; i++ ){
          var a=i+1
       var title= remotive.jobs[i].title
       var tags=remotive.jobs[i].tags
       var url=remotive.jobs[i].url
       var company=remotive.jobs[i].company_name
     
    //create new tiles to append to mainbody
    var tileid="tile-"+a
    $("#mainbody").append("<div id="+tileid+"></div>")
    var tile= $("#"+tileid)
    tile.addClass("tile is-parent notification is-primary is-vertical")
     //create card to append to tiles
      var idcont="cardcontent"+a
      var tileid="tile"+a

      
      //tile.append("<div id="+cardid+"></div>")
     tile.append("<div id="+idcont+"></div>")
      var cardcontent=$("#"+idcont)
      cardcontent.addClass("card-content")

       // creates job title header for cards
          var titleEl=$("<p>")
       titleEl.addClass("title")
      titleEl.text(title)
      
       cardcontent.append(titleEl)

        //create company el
      var companyEl=$("<button>").addClass("company")
      companyEl.text(company)
      cardcontent.append(companyEl)

       //creates url element
       var urlEl=$("<a>")
       urlEl.attr("href", url)
        urlEl.text(url)
       cardcontent.append(urlEl)

         //create footer
        var footerEl=$("<footer>").addClass("card-footer")
        cardcontent.append(footerEl)

      // creates tags link
       if(tags.length!=0){
           for(var x=0; x<tags.length; x++){
           var footeritem=$("<p>").addClass("card-footer-item")
          footerEl.append(footeritem)
           var tagslink=$("<span>")
           
           tagslink.text(tags[x])
          tagslink.append(footerEl)
       }}
       
       //creates new tile is child.
       var ischildid="childtile-"+a
       tile.append("<div id="+ischildid+"></div>")
       var dropdown=$("#"+ischildid)
       dropdown.addClass("tile is-child box notification is-info")
       dropdown.text("this is the dropdown")
       
   } 
  })

})

$(document).on("click", ".company", function(event){
  event.preventDefault();

  var apiKey = "api-key=TD8WaDGvjAOlRzEak47DMtf8oe7ReO62"
  var searchTag = "&q=" + $(this).text()
  var searchFilter = "&fq=section_name:(%22technology%22)"
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + apiKey + searchFilter + searchTag;
  var cardContent = $(this).parent()

  $.ajax({
    url: queryURL,
    method:"GET"
   }) .then(function(newsAPI){

  var dropDown = cardContent.siblings(".is-child")

  for(var j=0; j < 3; j++ ){
    var dataResponse = newsAPI.response.docs;

    var snippet = $("<p>").text("Summary: " + dataResponse[j].snippet);
    var headline = $("<p>").text("Section: " + dataResponse[j].headline.main);
    var articleURL = $("<a>").text("Link: " + dataResponse[j].web_url).attr({'href': dataResponse[j].web_url , "target": "_blank"});
 
    dropDown.append(headline, snippet, articleURL);
  }
  
})




})