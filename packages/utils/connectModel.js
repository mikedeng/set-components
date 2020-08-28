import { connect } from 'dva';

const effectSep = '/';
const fnSep = '_';

export function connectModel({ model }) {
	const { namespace } = model;
	const mapStateToProps = (state) => {
		const {
			loading: { effects },
		} = state;

		const stateContent = state[namespace];
		const loadingStates = Object.keys(effects)
			.map((key) => {
				const newKey = key.replace(effectSep, fnSep);
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
				const name = namespaceName.join(fnSep);
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

export default {}