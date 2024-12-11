
(function(){
    'use strict';
  
    class Menu {
      constructor(settings) {
        this.menuRootNode = settings.menuRootNode;
        this.isInitialized = false;
        this.isOpened = false;
      }
  
      changeMenuState(menuState) {
        return this.isOpened = !menuState;
      }
    }
  
    class MenuBurger extends Menu {
  
      constructor(settings) {
        super(settings);
        this.openText = settings.openText;
        this.closeText = settings.closeText;
        this.menuClassesNames = settings.menuClassesNames;
        this.menuLinks = this.menuRootNode.querySelectorAll(`.${this.menuClassesNames.menuItemClass}`);
        this.hiddenElementsQuery = settings.hiddenElementsQuery;
        this.pageNodes = document.querySelectorAll(this.hiddenElementsQuery);  
        this.toggleNode = this.menuRootNode.querySelector(`.${this.menuClassesNames.toggleClass}`);
        this.a11yAttributes = ['aria-hidden', 'inert'];
        this.a11yAttributeValues = {
          'aria-hidden': true,
          'inert': ''
        }
      }
  
      init() {
        let currentMenuState = this.changeMenuState(this.isOpened);
  
        this.changeToggleHint(
          this.getCurrentToggleHint(currentMenuState, this.openText, this.closeText), 
          this.menuRootNode.querySelector(`.${this.menuClassesNames.toggleHintClass}`)
        );
        this.menuRootNode.classList.toggle(`${this.menuClassesNames.activeClass}`);
        this.setCurrentA11yAttribute(currentMenuState, this.toggleNode, "aria-expanded");  
        this.getFocusCurrentNode(currentMenuState, this.toggleNode, this.menuLinks[0]);
        this.pageNodes
          .forEach(
            (node) => this.setCurrentPageA11yAttributes(
              currentMenuState, 
              node, 
              this.a11yAttributes, 
              this.a11yAttributeValues)
        ); 
      }
  
      changeToggleHint(toggleHint, toggleNode) {
        toggleNode.textContent = toggleHint;
        return toggleHint; 
      }
  
      getCurrentToggleHint(currentMenuState, openText, closeText) {
        return (currentMenuState !== true) ? openText : closeText;
      }
  
      setCurrentA11yAttribute(currentMenuState, toggleNode, attribute) {
        return (currentMenuState !== true) ? 
          toggleNode.removeAttribute(attribute) : 
          toggleNode.setAttribute(attribute, currentMenuState);
      }
  
      getFocusCurrentNode(currentMenuState, importantFocusNode, toggleNode) {
        return (currentMenuState !== true) ? 
          importantFocusNode.focus() : 
          toggleNode.focus();
      }
  
      setCurrentPageA11yAttributes(currentMenuState, node, a11yAttributes, a11yAttributeValues) {
        return (currentMenuState !== true) ? 
          a11yAttributes.forEach((attribute) => node.removeAttribute(attribute)) : 
          a11yAttributes.forEach((attribute) => node.setAttribute(attribute, a11yAttributeValues[attribute]));
      }
    }
  
    const menuClassesNames = {
      rootClass: 'js-cdpn-mobile-menu',
      activeClass: 'js-cdpn-mobile-menu_activated',
      toggleClass: 'js-cdpn-mobile-menu__toggle',
      toggleHintClass: 'js-cdpn-mobile-menu__toggle-hint',
      menuItemClass: 'js-cdpn-mobile-menu__link'
    }
  
    const jsMenuNode = document.querySelector(`.${menuClassesNames.rootClass}`);
    const demoMenu = new MenuBurger ({
      menuRootNode: jsMenuNode,
      menuClassesNames: menuClassesNames,
      openText: '',
      closeText: '',
      hiddenElementsQuery: `body > *:not(.${menuClassesNames.rootClass}):not(script)`
    });
  
    let menuIsDisplayed = false;
  
    function toggleMenu(event) {   
  
      if (menuIsDisplayed === false) {
        document.addEventListener('keyup', handleEscape);
      } 
  
      function handleEscape(event) {
  
        let key = event.which || event.keyCode;
  
        // remove the listener after click the button if he doesn't push the ESC key
        if (menuIsDisplayed === false) {
          document.removeEventListener('keyup', handleEscape);
        } 
  
        if (key === 27 && menuIsDisplayed === true) {
          event.stopPropagation();
          menuIsDisplayed = !menuIsDisplayed;
          document.removeEventListener('keyup', handleEscape);
          demoMenu.init();
        }
      };
  
      menuIsDisplayed = !menuIsDisplayed;
      return demoMenu.init();
    }
  
    jsMenuNode.querySelector(`.${menuClassesNames.toggleClass}`).addEventListener('click', toggleMenu);
  })();

  function max() {
    const toggleElement = document.querySelector('.js-cdpn-mobile-menu__toggle-hint');
    if (toggleElement) {
        toggleElement.click();
    } else {
        console.error('Element with class .js-cdpn-mobile-menu__toggle-hint not found');
    }
}
