import {Service, Inject} from '../../decorators';
import {DigestQueue} from './digest-queue';


@Service('CompileService')
@Inject('$compile', '$rootScope')
export default class CompileService {
  constructor($compile, $rootScope) {
    this.$compile = $compile;
    this.$rootScope = $rootScope;
  }

  compile(template, scope = {}) {
    scope = this.$rootScope.$new(scope);
    const element = this.$compile(template)(scope);

    return new DigestQueue(element, scope);
  }
}
