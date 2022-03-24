import View from './View';
import icons from '../../img/icons.svg';
import PreviewView from './PreviewView';

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query, Pleasy try again';
    _message = '';

    _generateMarkup() {
        return this._data
            .map(result => PreviewView.render(result, false))
            .join();
    }
}

export default new ResultsView();
