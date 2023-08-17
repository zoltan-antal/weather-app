import setUpEventListeners from './dom/handle-events';
import initializePage from './dom/initialize-page';

export default function main() {
  initializePage();
  setUpEventListeners();
}
