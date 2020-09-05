import { connect } from 'dva';
import { pluck } from './object';

const effectSep = '/';
const fnSep = '_';

/**
 * 连接 model
 *
 * @export
 * @param {*} { model 模型文件对象, states = [], prefixStates = false 是否给 states 添加前缀, prefixEffects = false 是否给 effects 添加前缀 }
 * @returns
 */
export function connectModel({ model, states = [], prefixStates = false, prefixEffects = false }) {
	const { namespace } = model;
	const mapStateToProps = (state) => {
		const {
			loading: { effects },
		} = state;

		let stateContent = state[namespace];
		if (Object.keys(states).length > 0) {
			stateContent = pluck(stateContent, states);
		}

		if (prefixStates) {
			stateContent = Object.keys(stateContent)
				.map((key) => {
					return { [[namespace, key].join(fnSep)]: stateContent[key] };
				})
				.reduce((h, c) => ({ ...h, ...c }), {});
		}

		const loadingStates = Object.keys(effects)
			.map((key) => {
				const [nspace, fnName] = key.split(effectSep);
				const newKey = prefixEffects ? [nspace, fnName].join(fnSep) : fnName;
				return { [`loading_${newKey}`]: effects[key] };
			})
			.reduce((h, c) => ({ ...h, ...c }), {});

		return { ...stateContent, ...loadingStates };
	};

	const mapDispatchToProps = (dispatch) => {
		const { effects, reducers } = model;
		const allEffects = Object.keys(effects)
			.concat(Object.keys(reducers))
			.map((fnName) => {
				const namespaceName = [namespace, fnName];
				const name = prefixEffects ? namespaceName.join(fnSep) : fnName;
				const type = namespaceName.join(effectSep);
				return {
					[name]: (payload) =>
						dispatch({
							type,
							payload,
						}),
				};
			})
			.reduce((h, c) => {
				return { ...h, ...c };
			}, {});

		return {
			...allEffects,
		};
	};

	return connect(
		mapStateToProps,
		mapDispatchToProps
	);
}

export default {};
