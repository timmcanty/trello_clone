TrelloClone.Routers.BoardRouter = Backbone.Router.extend({

  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
  },

  routes: {
    '' : 'boardIndex',
    'boards/new' : 'boardNew',
    'boards/:id' : 'boardShow'
  },

  boardIndex: function () {
    TrelloClone.boards.fetch();
    var boardIndexView = new TrelloClone.Views.BoardIndexView({
      collection: TrelloClone.boards
    });

    this._swapView(boardIndexView);
  },

  boardNew: function () {
    var boardFormView = new TrelloClone.Views.BoardFormView();

    this._swapView(boardFormView)
  },

  boardShow: function (id) {
    var board = TrelloClone.boards.getOrFetch(id);
    var boardShowView = new TrelloClone.Views.BoardShowView({
      model: board
    });

    this._swapView(boardShowView);
  },

  _swapView: function(newView) {
    if(this.currentView) {
      this.currentView.remove();
    }
    this.currentView = newView;

    this.$rootEl.html(this.currentView.render().$el);
  }
})
