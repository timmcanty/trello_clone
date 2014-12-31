TrelloClone.Views.BoardShowView = Backbone.CompositeView.extend({

  events: {
    'click form .submit-new-list' : 'createList',
    'click .destroy-board' : 'deleteBoard',
    'click .create-list-form' : 'newList',
    'click .cancel-new-list' : 'newListCancel'
  },

  initialize: function () {
    this.listenTo( this.model, 'sync', this.render);
    this.listenTo( this.model.lists(), 'add', this.addList);
    this.listenTo( this.model.lists(), 'remove', this.removeList);
    this.model.lists().each(this.addList.bind(this));
  },


  template: JST['boards/show'],

  render: function () {
    var view = this;
    if (!this.model) {
      return this;
    }


    var renderedContent = this.template({board: this.model});
    this.$el.html(renderedContent);
    this.attachSubviews();
    this.$('.sortable').sortable({
      axis: 'y',
      update: function (event,ui) {
        var idsOrder = [];
        $(this).children().each( function (){
          console.log(this)
          idsOrder.push(this.id);
        });
        console.log(idsOrder);
      }
    });
    return this;
  },

  newList: function () {
    var form = JST['lists/new'];
    this.$el.append(form);
    this.$('button.create-list-form').prop('disabled', true);
  },

  newListCancel: function () {
    this.$('button.create-list-form').prop('disabled', false);
    this.$('form.create-new-list').remove();
  },

  addList: function (list) {
    var listShow = new TrelloClone.Views.ListShowView({model: list});
    this.addSubview(".board-lists", listShow.render());
  },

  removeList: function (list) {
    var subview = _.find(
      this.subviews(".board-lists"),
      function (subview) {
        return subview.model === list;
      }
    );

    this.removeSubview(".board-lists", subview);
  },

  createList: function (event) {
    event.preventDefault();
    var formData = $('form').serializeJSON().list;
    var list = new TrelloClone.Models.List({
      board: this.model,
      board_id: this.model.id,
      title: formData.title,
      ord: 0
    });
    this.newListCancel();
    list.save({}, {
      success: function () {
        this.model.lists().add(list);
      }.bind(this),
      fail: function (model, resp) {
        var errors = resp.responseJSON;
        errors.forEach ( function (error) {
          alert(error);
        })
      }
    });
  },

  deleteBoard: function () {
    TrelloClone.boards.remove(this.model);
    this.model.destroy();
    Backbone.history.navigate('', {trigger: true});
  }
})
