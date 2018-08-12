#define PROCESSING_TEXTURE_SHADER

uniform sampler2D texture;
uniform float a;
varying vec4 vertTexCoord;

vec4 Sepia( in vec4 color )
{
  float alpha;
  if(color.a == 0.0){
    alpha = 0.0;
  } else {
    alpha = 1;
  }
    return vec4(
          clamp(color.r * 0.299 + color.g * 0.587 + color.b * 0.114, 0.0, 1.0),
          clamp(color.r * 0.299 + color.g * 0.587 + color.b * 0.114, 0.0, 1.0),
          clamp(color.r * 0.299 + color.g * 0.587 + color.b * 0.114, 0.0, 1.0),
          alpha
    );
}

void main (void){
  vec4 texColor = texture2D(texture, vertTexCoord.xy).rgba;
  gl_FragColor = vec4(Sepia(texColor));
}
