TrelloClone.Views.ListFormView = Backbone.View.extend({

  events: {
    'click .new-card-submit' : 'createNewCard'
  },

  template: JST['lists/form'],

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  createNewCard: function (event) {
    event.preventDefault();
    var title = this.$('#new-board-title').val();
    var userId = TrelloClone.currentUserId
    var board = new TrelloClone.Models.Board({
      title: title,
      user_id: userId});
      board.save({}, {
        success: function () {
          TrelloClone.boards.add(board);
          Backbone.history.navigate('/boards/' + board.id, {trigger: true});
        },
        error: function (model, resp) {
          var errors = resp.responseJSON;
          $('.alert').html('<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>');
          errors.forEach( function (err){
            $('.alert').append('<br>');
            $('.alert').append(err);
          })
        }
      });
    }
  })
