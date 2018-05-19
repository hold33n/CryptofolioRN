// @flow

export type User = {|
  email: string,
  id?: string,
  password?: string;
|};


export type State = {
  +user: null | User,
  +progress: boolean,
  +formState: 'SignIn' | 'SignUp',
  +error: null | string,
};


export type Action =
  | { +type: 'SIGN_IN_REQUEST'
    }
  | { +type: 'SIGN_IN_START'
    }
  | { +type: 'SIGN_IN_SUCCESS',
      payload: {
        user: User
      }
    }
  | { +type: 'SIGN_IN_FAIL',
      payload: {
        error: string
      }
    }
  | { +type: 'SIGN_UP_REQUEST'
    }
  | { +type: 'SIGN_UP_START'
    }
  | { +type: 'SIGN_UP_SUCCESS',
      payload: {
        user: User
      }
    }
  | { +type: 'SIGN_UP_FAIL',
      payload: {
        error: string
      }
    }
  | { +type: 'SIGN_OUT_REQUEST'
    }
  | { +type: 'SIGN_OUT_START'
    }
  | { +type: 'SIGN_OUT_SUCCESS'
    }
  | { +type: 'SIGN_OUT_FAIL',
      payload: {
        error: string
      }
    }
  | { +type: 'TOGGLE_FORM_STATE_REQUEST'
    }
  | { +type: 'TOGGLE_FORM_STATE_START'
    }
  | { +type: 'TOGGLE_FORM_STATE_SUCCESS',
      payload: {
        formState: 'SignIn' | 'SignUp'
      }
    }
  | { +type: 'TOGGLE_FORM_STATE_FAIL',
      payload: {
        error: string
      }
    };
