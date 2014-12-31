TrelloClone.Views.CardShowView = Backbone.View.extend({

  events: {
    'click button.delete-card' : 'deleteCard'
  },


  deleteCard: function () {
    console.log(this.model)
    this.model.list.cards().remove(this.model);
    this.model.destroy();
    this.remove();
  },

  tagName: 'li',


  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.$el.addClass('card-display');
  },

  template: JST['cards/show'],



  render: function () {
    if (!this.model) {
      return this;
    }
    var renderedContent = this.template({card: this.model});
    this.$el.html(renderedContent);
    this.$el.attr('id', this.model.id);
    return this;
  }
})
