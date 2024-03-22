import '../styles/Greeting.scss';

export default function Greeting({ onClick }: { onClick: (action: string) => void }): JSX.Element {
  localStorage.setItem('isGreetingPlayed', 'played');

  return (
    <div className="container">
      <div className="greeting__block">
        <svg id="logo" width="702" height="94" viewBox="0 0 702 94" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M671.184 93.152C666.917 93.152 663.035 92.2987 659.536 90.592C656.123 88.8853 653.435 86.5813 651.472 83.68C649.595 80.7787 648.656 77.536 648.656 73.952C648.656 69.344 649.808 65.7173 652.112 63.072C654.416 60.4267 658.299 58.5493 663.76 57.44C669.221 56.2453 676.56 55.648 685.776 55.648H691.792V63.072H686.032C679.461 63.072 674.256 63.3707 670.416 63.968C666.661 64.5653 664.016 65.632 662.48 67.168C660.944 68.6187 660.176 70.6667 660.176 73.312C660.176 76.64 661.328 79.3707 663.632 81.504C666.021 83.6373 669.264 84.704 673.36 84.704C676.603 84.704 679.461 83.936 681.936 82.4C684.411 80.7787 686.373 78.6453 687.824 76C689.275 73.2693 690 70.1547 690 66.656V51.936C690 46.9013 688.976 43.2747 686.928 41.056C684.88 38.752 681.424 37.6 676.56 37.6C673.744 37.6 670.843 37.984 667.856 38.752C664.869 39.52 661.755 40.7147 658.512 42.336C657.232 42.9333 656.123 43.1467 655.184 42.976C654.245 42.72 653.477 42.208 652.88 41.44C652.368 40.5867 652.069 39.6907 651.984 38.752C651.984 37.728 652.197 36.7467 652.624 35.808C653.136 34.8693 653.989 34.1867 655.184 33.76C658.939 31.8827 662.651 30.56 666.32 29.792C670.075 28.9387 673.573 28.512 676.816 28.512C682.363 28.512 686.928 29.408 690.512 31.2C694.096 32.9067 696.784 35.5947 698.576 39.264C700.368 42.848 701.264 47.456 701.264 53.088V86.88C701.264 88.8427 700.795 90.336 699.856 91.36C698.917 92.384 697.552 92.896 695.76 92.896C694.053 92.896 692.688 92.384 691.664 91.36C690.725 90.336 690.256 88.8427 690.256 86.88V77.792H691.408C690.725 80.9493 689.445 83.68 687.568 85.984C685.691 88.288 683.344 90.08 680.528 91.36C677.797 92.5547 674.683 93.152 671.184 93.152Z"
            stroke="#172b4d"
            strokeWidth="2px"
          />
          <path
            d="M547.11 92.896C545.318 92.896 543.91 92.384 542.886 91.36C541.862 90.336 541.35 88.8427 541.35 86.88V34.656C541.35 32.6933 541.862 31.2427 542.886 30.304C543.91 29.28 545.318 28.768 547.11 28.768C548.902 28.768 550.267 29.28 551.206 30.304C552.23 31.2427 552.742 32.6933 552.742 34.656V45.536L551.334 43.232C552.955 38.5387 555.558 34.912 559.142 32.352C562.811 29.792 567.163 28.512 572.198 28.512C577.489 28.512 581.755 29.792 584.998 32.352C588.241 34.8267 590.417 38.624 591.526 43.744H589.734C591.27 39.0507 594.001 35.3387 597.926 32.608C601.937 29.8773 606.587 28.512 611.878 28.512C616.571 28.512 620.411 29.4507 623.398 31.328C626.47 33.12 628.774 35.8507 630.31 39.52C631.846 43.104 632.614 47.712 632.614 53.344V86.88C632.614 88.8427 632.102 90.336 631.078 91.36C630.054 92.384 628.646 92.896 626.854 92.896C624.977 92.896 623.526 92.384 622.502 91.36C621.478 90.336 620.966 88.8427 620.966 86.88V53.856C620.966 48.3947 620.027 44.384 618.15 41.824C616.273 39.264 613.115 37.984 608.678 37.984C603.814 37.984 599.931 39.6907 597.03 43.104C594.214 46.432 592.806 51.04 592.806 56.928V86.88C592.806 88.8427 592.294 90.336 591.27 91.36C590.331 92.384 588.923 92.896 587.046 92.896C585.169 92.896 583.718 92.384 582.694 91.36C581.67 90.336 581.158 88.8427 581.158 86.88V53.856C581.158 48.3947 580.219 44.384 578.342 41.824C576.465 39.264 573.307 37.984 568.87 37.984C564.006 37.984 560.123 39.6907 557.222 43.104C554.406 46.432 552.998 51.04 552.998 56.928V86.88C552.998 90.8907 551.035 92.896 547.11 92.896Z"
            stroke="#172b4d"
            strokeWidth="2px"
          />
          <path
            d="M495.965 93.152C489.821 93.152 484.488 91.8293 479.965 89.184C475.442 86.5387 471.944 82.784 469.469 77.92C466.994 73.056 465.757 67.3387 465.757 60.768C465.757 55.8187 466.44 51.3813 467.805 47.456C469.256 43.4453 471.304 40.032 473.949 37.216C476.594 34.4 479.752 32.2667 483.421 30.816C487.176 29.28 491.357 28.512 495.965 28.512C502.109 28.512 507.442 29.8347 511.965 32.48C516.488 35.1253 519.986 38.88 522.461 43.744C524.936 48.5227 526.173 54.1973 526.173 60.768C526.173 65.7173 525.448 70.1973 523.997 74.208C522.632 78.2187 520.626 81.632 517.981 84.448C515.336 87.264 512.136 89.44 508.381 90.976C504.712 92.4267 500.573 93.152 495.965 93.152ZM495.965 83.936C499.72 83.936 502.962 83.04 505.693 81.248C508.509 79.456 510.642 76.8533 512.093 73.44C513.629 70.0267 514.397 65.8027 514.397 60.768C514.397 53.2587 512.733 47.5413 509.405 43.616C506.077 39.6907 501.597 37.728 495.965 37.728C492.296 37.728 489.053 38.624 486.237 40.416C483.506 42.1227 481.373 44.6827 479.837 48.096C478.301 51.5093 477.533 55.7333 477.533 60.768C477.533 68.2773 479.197 74.0373 482.525 78.048C485.938 81.9733 490.418 83.936 495.965 83.936Z"
            stroke="#172b4d"
            strokeWidth="2px"
          />
          <path
            d="M381.78 92C379.732 92 378.153 91.4453 377.044 90.336C375.935 89.2267 375.38 87.648 375.38 85.6V8.16C375.38 6.112 375.935 4.53333 377.044 3.424C378.153 2.31466 379.732 1.75999 381.78 1.75999H406.484C421.247 1.75999 432.596 5.64266 440.532 13.408C448.553 21.088 452.564 32.224 452.564 46.816C452.564 54.0693 451.54 60.512 449.492 66.144C447.444 71.776 444.457 76.512 440.532 80.352C436.607 84.1067 431.785 87.008 426.068 89.056C420.436 91.0187 413.908 92 406.484 92H381.78ZM387.284 81.888H405.716C411.519 81.888 416.553 81.1627 420.82 79.712C425.087 78.2613 428.628 76.0853 431.444 73.184C434.345 70.2827 436.521 66.656 437.972 62.304C439.423 57.8667 440.148 52.704 440.148 46.816C440.148 35.1253 437.247 26.3787 431.444 20.576C425.727 14.7733 417.151 11.872 405.716 11.872H387.284V81.888Z"
            stroke="#172b4d"
            strokeWidth="2px"
          />
          <path
            d="M295.34 93.152C289.196 93.152 283.863 91.8293 279.34 89.184C274.817 86.5387 271.319 82.784 268.844 77.92C266.369 73.056 265.132 67.3387 265.132 60.768C265.132 55.8187 265.815 51.3813 267.18 47.456C268.631 43.4453 270.679 40.032 273.324 37.216C275.969 34.4 279.127 32.2667 282.796 30.816C286.551 29.28 290.732 28.512 295.34 28.512C301.484 28.512 306.817 29.8347 311.34 32.48C315.863 35.1253 319.361 38.88 321.836 43.744C324.311 48.5227 325.548 54.1973 325.548 60.768C325.548 65.7173 324.823 70.1973 323.372 74.208C322.007 78.2187 320.001 81.632 317.356 84.448C314.711 87.264 311.511 89.44 307.756 90.976C304.087 92.4267 299.948 93.152 295.34 93.152ZM295.34 83.936C299.095 83.936 302.337 83.04 305.068 81.248C307.884 79.456 310.017 76.8533 311.468 73.44C313.004 70.0267 313.772 65.8027 313.772 60.768C313.772 53.2587 312.108 47.5413 308.78 43.616C305.452 39.6907 300.972 37.728 295.34 37.728C291.671 37.728 288.428 38.624 285.612 40.416C282.881 42.1227 280.748 44.6827 279.212 48.096C277.676 51.5093 276.908 55.7333 276.908 60.768C276.908 68.2773 278.572 74.0373 281.9 78.048C285.313 81.9733 289.793 83.936 295.34 83.936Z"
            stroke="#172b4d"
            strokeWidth="2px"
          />
          <path
            d="M250.553 93.152C244.153 93.152 239.289 91.2747 235.961 87.52C232.633 83.68 230.969 78.176 230.969 71.008V6.752C230.969 4.78933 231.481 3.33866 232.505 2.39999C233.529 1.376 234.937 0.863998 236.729 0.863998C238.606 0.863998 240.057 1.376 241.081 2.39999C242.105 3.33866 242.617 4.78933 242.617 6.752V70.112C242.617 74.5493 243.513 77.8773 245.305 80.096C247.182 82.2293 249.828 83.296 253.241 83.296C254.009 83.296 254.692 83.296 255.289 83.296C255.886 83.2107 256.484 83.1253 257.081 83.04C258.02 82.9547 258.702 83.2107 259.129 83.808C259.556 84.4053 259.769 85.6 259.769 87.392C259.769 89.0133 259.385 90.2933 258.617 91.232C257.934 92.0853 256.782 92.64 255.161 92.896C254.393 92.9813 253.625 93.024 252.857 93.024C252.089 93.1093 251.321 93.152 250.553 93.152Z"
            stroke="#172b4d"
            strokeWidth="2px"
          />
          <path
            d="M212.053 93.152C205.653 93.152 200.789 91.2747 197.461 87.52C194.133 83.68 192.469 78.176 192.469 71.008V6.752C192.469 4.78933 192.981 3.33866 194.005 2.39999C195.029 1.376 196.437 0.863998 198.229 0.863998C200.106 0.863998 201.557 1.376 202.581 2.39999C203.605 3.33866 204.117 4.78933 204.117 6.752V70.112C204.117 74.5493 205.013 77.8773 206.805 80.096C208.682 82.2293 211.328 83.296 214.741 83.296C215.509 83.296 216.192 83.296 216.789 83.296C217.386 83.2107 217.984 83.1253 218.581 83.04C219.52 82.9547 220.202 83.2107 220.629 83.808C221.056 84.4053 221.269 85.6 221.269 87.392C221.269 89.0133 220.885 90.2933 220.117 91.232C219.434 92.0853 218.282 92.64 216.661 92.896C215.893 92.9813 215.125 93.024 214.357 93.024C213.589 93.1093 212.821 93.152 212.053 93.152Z"
            stroke="#172b4d"
            strokeWidth="2px"
          />
          <path
            d="M152.894 93.152C146.153 93.152 140.35 91.872 135.486 89.312C130.707 86.6667 126.995 82.9547 124.35 78.176C121.705 73.312 120.382 67.5947 120.382 61.024C120.382 54.5387 121.662 48.864 124.222 44C126.867 39.136 130.451 35.3387 134.974 32.608C139.582 29.8773 144.83 28.512 150.718 28.512C154.899 28.512 158.654 29.2373 161.982 30.688C165.395 32.0533 168.297 34.0587 170.686 36.704C173.075 39.3493 174.867 42.592 176.062 46.432C177.342 50.1867 177.982 54.4533 177.982 59.232C177.982 60.5973 177.555 61.664 176.702 62.432C175.934 63.1147 174.782 63.456 173.246 63.456H129.47V56.032H170.302L168.126 57.824C168.126 53.3867 167.443 49.632 166.078 46.56C164.798 43.4027 162.878 41.0133 160.318 39.392C157.843 37.7707 154.729 36.96 150.974 36.96C146.878 36.96 143.379 37.9413 140.478 39.904C137.577 41.7813 135.358 44.4693 133.822 47.968C132.286 51.3813 131.518 55.3493 131.518 59.872V60.64C131.518 68.32 133.353 74.1227 137.022 78.048C140.691 81.9733 145.982 83.936 152.894 83.936C155.625 83.936 158.398 83.5947 161.214 82.912C164.115 82.2293 166.889 80.992 169.534 79.2C170.814 78.432 171.966 78.0907 172.99 78.176C174.099 78.176 174.995 78.5173 175.678 79.2C176.361 79.7973 176.787 80.5653 176.958 81.504C177.129 82.3573 177.001 83.296 176.574 84.32C176.147 85.344 175.337 86.24 174.142 87.008C171.326 88.9707 167.955 90.5067 164.03 91.616C160.19 92.64 156.478 93.152 152.894 93.152Z"
            stroke="#172b4d"
            strokeWidth="2px"
          />
          <path
            d="M84.235 92.896C82.2723 92.896 80.779 92.384 79.755 91.36C78.731 90.336 78.219 88.8427 78.219 86.88V34.656C78.219 32.6933 78.731 31.2427 79.755 30.304C80.779 29.28 82.187 28.768 83.979 28.768C85.771 28.768 87.1363 29.28 88.075 30.304C89.099 31.2427 89.611 32.6933 89.611 34.656V44.512H88.331C89.6963 39.392 92.2563 35.5093 96.011 32.864C99.7657 30.2187 104.502 28.7253 110.219 28.384C111.584 28.2987 112.694 28.64 113.547 29.408C114.4 30.0907 114.87 31.2853 114.955 32.992C115.04 34.6133 114.656 35.936 113.803 36.96C112.95 37.8987 111.627 38.4533 109.835 38.624L107.531 38.752C101.899 39.3493 97.547 41.184 94.475 44.256C91.4883 47.328 89.995 51.552 89.995 56.928V86.88C89.995 88.8427 89.483 90.336 88.459 91.36C87.5203 92.384 86.1123 92.896 84.235 92.896Z"
            stroke="#172b4d"
            strokeWidth="2px"
          />
          <path
            d="M39.912 92.896C37.9494 92.896 36.456 92.384 35.432 91.36C34.408 90.2507 33.896 88.7147 33.896 86.752V11.872H5.86403C4.24269 11.872 2.96269 11.4453 2.02403 10.592C1.08536 9.65333 0.616028 8.37333 0.616028 6.752C0.616028 5.13066 1.08536 3.89333 2.02403 3.03999C2.96269 2.18666 4.24269 1.75999 5.86403 1.75999H73.832C75.5387 1.75999 76.8187 2.18666 77.672 3.03999C78.6107 3.89333 79.08 5.13066 79.08 6.752C79.08 8.37333 78.6107 9.65333 77.672 10.592C76.8187 11.4453 75.5387 11.872 73.832 11.872H45.8V86.752C45.8 88.7147 45.288 90.2507 44.264 91.36C43.3254 92.384 41.8747 92.896 39.912 92.896Z"
            stroke="#172b4d"
            strokeWidth="2px"
          />
        </svg>
        <div className="greeting__subtitle">
          <p className="first__str">
            Таке ж як і оригінальне Trello. <span className="second__str">Ну майже &#41;</span>
          </p>
        </div>
        <div className="to__auth__block">
          <button
            className="add auth"
            name="sign-in"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClick(e.currentTarget.name)}
          >
            Увійти
          </button>
          <div className="or">
            <div>
              <hr />
            </div>
            Або
            <div>
              <hr />
            </div>
          </div>
          <button
            className="add auth"
            name="sign-up"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClick(e.currentTarget.name)}
          >
            Зареєструватись
          </button>
        </div>
      </div>
    </div>
  );
}