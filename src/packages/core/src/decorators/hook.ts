import { HookParams } from '../common/types';
import { HookManager, HookRegister } from '../hook-manager';

export function Hook<G, A>(hookType: HookRegister) {
	return (target: any, _: string, descriptor: PropertyDescriptor) => {
		const hook = descriptor.value;
		if (typeof hook !== 'function') {
			throw new Error(`@Hook decorator can only be applied to a method.`);
		}

		const hookManager = target.hookManager || new HookManager<G>();
		hookManager.registerHook(hookType, async (params: HookParams<G, A>) => {
			return hook.call(target, params);
		});
		target.hookManager = hookManager;
	};
}
