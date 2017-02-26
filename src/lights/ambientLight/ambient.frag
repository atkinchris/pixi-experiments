uniform sampler2D uSampler;
uniform sampler2D uNormalSampler;

// light color, has multiplied bright for intensity.
uniform vec3 uLightColor;

// light attenuation coefficients (constant, linear, quadratic)
uniform vec3 uLightFalloff;

varying vec2 vTextureCoord;
varying vec2 vNormalTextureCoord;

uniform vec2 uViewSize;

uniform mat3 uWorldMatrix;
uniform bool uFixedNormal;


void main(void) {

    vec4 diffuseColor = texture2D(uSampler, vTextureCoord);

    // bail out early when diffuse has no data
    if (diffuseColor.a == 0.0) {
       discard;
    }
    vec4 normalColor = texture2D(uNormalSampler, vNormalTextureCoord);

    // Red layer is X coords.
    // normalColor.r = 1.0 - normalColor.r;

    // Green layer is flipped Y coords.
    normalColor.g = 1.0 - normalColor.g;

    uViewSize;

    // simplified lambert shading that makes assumptions for ambient color

    // compute Distance
    float D = 1.0;

    // normalize vectors
    vec3 N;
    if (uFixedNormal) {
        N = normalize(normalColor.xyz * 2.0 - 1.0);
    } else {
        vec3 normal3 = vec3(normalColor.xyz * 2.0 - 1.0);
        N = normalize(vec3((uWorldMatrix * vec3(normal3.xy, 0.0)).xy , normal3.z));
    }

    vec3 L = vec3(1.0, 1.0, 1.0);

    // pre-multiply light color with intensity
    // then perform "N dot L" to determine our diffuse
    vec3 diffuse = uLightColor * max(dot(N, L), 0.0);

    vec3 finalColor = diffuseColor.rgb * diffuse;

    gl_FragColor = vec4(finalColor, diffuseColor.a);
}
