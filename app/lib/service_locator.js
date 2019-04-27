'use strict';

function ServiceLocator() {
  this.dependencyMap = {};
  this.dependencyCache = {};
}

/**
 * The register method takes in the dependency name and its constructor,
 * then proceeds to add it to the dependencyMap object initialised in the ServiceLocator constructor.
 *
 * @param dependencyName
 * @param constructor
 */
ServiceLocator.prototype.register = function (dependencyName, constructor) {
  if (typeof constructor !== 'function') {
    throw new Error(dependencyName + ': Dependency constructor is not a function');
  }

  if (!dependencyName) {
    throw new Error('Invalid dependency name provided');
  }

  this.dependencyMap[dependencyName] = constructor;
};

/**
 * The get method retrieves a dependency from the dependencyMap object that matches the name passed in as the function argument.
 * If the requested dependency is not in the cache, it initialise the dependency and adds it to the cache then returns it.
 *
 * @param dependencyName
 * @return {*}
 */
ServiceLocator.prototype.get = function (dependencyName) {
  if (this.dependencyMap[dependencyName] === undefined) {
    throw new Error(dependencyName + ': Attepting to retrieve unknown dependency');
  }

  if (typeof this.dependencyMap[dependencyName] !== 'function') {
    throw new Error(dependencyName + ': Dependency constructor is not a function');
  }

  if (this.dependencyCache[dependencyName] === undefined) {
    const dependencyConstructor = this.dependencyMap[dependencyName];
    const dependency = dependencyConstructor(this);
    if (dependency) {
      this.dependencyCache[dependencyName] = dependency;
    }
  }

  return this.dependencyCache[dependencyName];
};

/**
 * The clear method basically just removes all dependencies from the map and from the cache.
 */
ServiceLocator.prototype.clear = function () {
  this.dependencyCache = {};
  this.dependencyMap = {};
};

module.exports = new ServiceLocator();
