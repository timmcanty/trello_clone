TrelloClone.Views.ListShowView = Backbone.CompositeView.extend({

  events: {
    'click button.delete-list' : 'deleteList',
    'click button.create-new-card' : 'newCard',
    'click button.cancel-new-card' : 'cancelNewCard',
    'submit' : 'createCard',
    'start' : 'reSortCards'
  },


  reSortCards: function (event, ui) {
    console.log('resort')
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo( this.model.cards(), 'add', this.addCard);
    this.model.cards().each(this.addCard.bind(this));
    this.$el.addClass('list-containers');

  },

  template: JST['lists/show'],

  createCard: function (event) {
    event.preventDefault();
    var cardParams = this.$('form').serializeJSON()
    cardParams.ord = 0;
    cardParams.list_id = this.model.id;
    var card = new TrelloClone.Models.Card(cardParams);
    card.list = this.model;

    card.save({}, {
      success: function () {
        this.model.cards().add(card);
      }.bind(this),
      error: function () {
        alert('DID NOT SAVE')
      }
    });

    this.cancelnewCard();
  },

  cancelnewCard: function () {
    this.$(' button.create-new-card').prop('disabled', false)
    this.$('form').remove();
  },


  newCard: function () {
    var form = JST['lists/form']
    this.$el.append(form);
    this.$(' button.create-new-card').prop('disabled', true)
  },

  addCard: function (card) {
    var cardShow = new TrelloClone.Views.CardShowView({model: card});
    this.addSubview(".card-list", cardShow.render());
  },

  removeCard: function (card) {
    var subview = _.find(
      this.subviews(".card-list"),
      function (subview) {
        return subview.model === card;
      }
    );

    this.removeSubview(".card-list", subview);
  },

  deleteList: function () {
    this.model.board.lists().remove(this.model);
    this.model.destroy();
    this.remove();
  },

  render: function () {
    if (!this.model) {
      return this;
    }
    var renderedContent = this.template({list: this.model});
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }

})
