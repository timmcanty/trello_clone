TrelloClone.Collections.Cards = Backbone.Collection.extend({

  initialize: function (model , options) {
    this.list = options.list;
    this.comparator = 'ord'
  },


  url: 'api/cards',
  model: TrelloClone.Models.Card
})
