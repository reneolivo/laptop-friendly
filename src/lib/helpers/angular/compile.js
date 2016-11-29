import {Service, Inject} from '../../decorators';
import {DigestQueue} from './digest-queue';


@Service('CompileService')
@Inject('$compile', '$rootScope')
export default class CompileService {
  constructor($compile, $rootScope) {
    this.$compile = $compile;
    this.$rootScope = $rootScope;
  }

  compile(template, scopeData = {}) {
    let scope = this.$rootScope.$new();

    Object.assign(scope, scopeData);

    const element = this.$compile(template)(scope);

    return new DigestQueue(element, scope);
  }
}
