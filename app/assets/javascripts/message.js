$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =`
      <div class="chat-main-message-list">
        <div class="chat-main-message-list-info">
          <div class="chat-main-message-list-info-talker">
            ${message.user_name}
          </div>
          <div class="chat-main-message-list-info-date">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main-message-list-text">
          <p class="chat-main-message-list-text__content">
            ${message.content}
          </p>
        </div>
        <img src=${message.image} >
      </div>`
        return html;
    } else{
      var html =`
      <div class="chat-main-message-list">
        <div class="chat-main-message-list-info">
          <div class="chat-main-message-list-info-talker">
            ${message.user_name}
          </div>
          <div class="chat-main-message-list-info-date">
            ${message.created_at}
          </div>
        </div>
          <div class="chat-main-message-list-text">
            <p class="chat-main-message-list-text__content">
              ${message.content}
            </p>
          </div>
        </div>`
        return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main-message').append(html);
      $('.chat-main-message').animate({ scrollTop: $('.chat-main-message')[0].scrollHeight});
      $('form')[0].reset();
      $(".chat-main-message-form-new-submit").prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  })
});