(() => {

  const actions = {
    birdFlies(bool) {
      if(bool) {
        document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`
        document.querySelector('[data-index="2"] .bird').style.transition = `1.5s 0.25s linear`
      } else {
        document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`
      }
    },
    birdFlies2(bool) {
      if(bool) {
        document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, ${-window.innerHeight * 0.7}px)`
        document.querySelector('[data-index="5"] .bird').style.transition = `1.5s 0.25s linear`
      } else {
        document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`
      }
    }
  }

  const stepElems = document.querySelectorAll('.step');
  const graphicElems = document.querySelectorAll('.graphic-item');

  let currentItem = graphicElems[0];
  activate(currentItem);

  let ioIndex;

  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = Number(entries[0].target.dataset.index);
  });

  stepElems.forEach((step) => {
    io.observe(step);
  })

  stepElems.forEach((step, index=0) => {
    step.setAttribute('data-index', index++);
  })

  graphicElems.forEach((graphic, index=0) => {
    graphic.setAttribute('data-index', index++);
  })

  function activate(elem) {
    elem.classList.add('visible');

    if(elem.dataset.action) {
      actions[(elem.dataset.action)](true);
    }
  }

  function inactivate(elem) {
    elem.classList.remove('visible');

    if(elem.dataset.action) {
      actions[(elem.dataset.action)](false);
    }
  }

  function setCurrentItem(elem) {
    currentItem = elem;
  }

  function isShow(rect) {
    return rect.top > window.innerHeight * 0.1 && rect.top < window.innerHeight * 0.8
  }

  window.addEventListener('scroll', () => {
    [ioIndex-1, ioIndex, ioIndex+1].forEach((index) => {
      if(0 > index) return;

      const boundingRect = stepElems[index].getBoundingClientRect();

      if(isShow(boundingRect)) {
        inactivate(currentItem);
        setCurrentItem(graphicElems[stepElems[index].getAttribute('data-index')]);
        activate(currentItem);
      }
    })
  });

  window.addEventListener('load', () => {
    setTimeout(()=> scrollTo(0, 0), 100);
  })
})();