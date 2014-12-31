TrelloClone.Views.BoardIndexView = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  template: JST['boards/index'],

  tagName: 'ul',

  render: function() {
    this.$el.html(this.template({boards: this.collection}));
    return this;
  }

})
