// @flow

export type User = {|
  email: string,
  id: string
|}


export type AuthAction =
  | { type: 'cryptofolio/auth/SIGN_IN_REQUEST',
    }
  | { type: 'cryptofolio/auth/SIGN_IN_START',
    }
  | { type: 'cryptofolio/auth/SIGN_IN_SUCCESS',
      payload: {|
        user: User
      |}
    }
  | { type: 'cryptofolio/auth/SIGN_IN_FAIL',
      payload: {|
        error: string
      |}
    }
  | { type: 'cryptofolio/auth/SIGN_UP_REQUEST'
    }
  | { type: 'cryptofolio/auth/SIGN_UP_START'
    }
  | { type: 'cryptofolio/auth/SIGN_UP_SUCCESS',
      payload: {
        user: User
      }
    }
  | { type: 'cryptofolio/auth/SIGN_UP_FAIL',
      payload: {
        error: string
      }
    }
  | { type: 'cryptofolio/auth/SIGN_OUT_REQUEST'
    }
  | { type: 'cryptofolio/auth/SIGN_OUT_START'
    }
  | { type: 'cryptofolio/auth/SIGN_OUT_SUCCESS'
    }
  | { type: 'cryptofolio/auth/SIGN_OUT_FAIL',
      payload: {
        error: string
      }
    }
  | { type: 'cryptofolio/auth/TOGGLE_FORM_STATE_REQUEST'
    }
  | { type: 'cryptofolio/auth/TOGGLE_FORM_STATE_START'
    }
  | { type: 'cryptofolio/auth/TOGGLE_FORM_STATE_SUCCESS',
      payload: { formState: 'SignIn' | 'SignUp' }
    }
  | { type: 'cryptofolio/auth/TOGGLE_FORM_STATE_FAIL',
      payload: {
        error: string
      }
    };
